# import pymongo
import pdfplumber
import re
import json as js
import pandas as pd
import pymongo

json_config=open("./src/pythonPdfScript/config.json")
json_config=json_config.read()
json_config=js.loads(json_config)


pdf_path="./src/pythonPdfScript/uploads/output.pdf"

with pdfplumber.open(pdf_path) as pdf:
      
    extracted_data=[]
    
    for page_number in range(len(pdf.pages)):
       
       #get the page you want to read from the complete pdf

        page = pdf.pages[page_number]
    
        # Extract the table in form of python list 

        table = page.extract_table()
        
        # handles the exception for the blank page or the page with no table in it
         
        if(table==None):
             if(page_number==len(pdf.pages)):break;
             continue
        
        #puts the extracted list in a list name as extracted list

        extracted_data.extend(table)



# print(type(extracted_data))
# for i in extracted_data:
#      print(i)


def result_1(pattern,data):
     result=False

     if type(data)==str and data!=None :
        try:
                data=data.lower()
        except:
             print("error encountered")
        if re.search(pattern,data):
              result=True
     return result

def findingCondition():
          condition=[]
          Abbriviation=[]
          for types in json_config:
               format_Condition=[]
               format_Abriviation=[]
               conditio=None
               Abbri=None
               for formats in json_config[types]:
                    conditio=json_config[types][formats]["Condition"]
                    Abbri=json_config[types][formats]["Abriviation"]
                    if conditio:
                         format_Condition.append(conditio)   
                    if Abbri:
                         format_Abriviation.append(Abbri)
               Abbriviation.append(format_Abriviation)         
               condition.append(format_Condition)    
                       
          return condition,Abbriviation

def checkTruesCondition(column,keys,abbriviation):
      column=column.lower()
      for key in keys:
            patternList=abbriviation[key]
            for KeyStyle in patternList:
                 if type(KeyStyle)==str: 
                    KeyStyle=KeyStyle.lower
                    if(re.search(KeyStyle,column)):
                          return True
      
      return False
      
def checkCondition(condition,object_1,keys):
          # print(object_1)
          formatedExpression=condition.format(**object_1)
          if(eval(formatedExpression)):
                return True
          return False  

def check_key(pattern,list):
      for data in list:
        
         for p in pattern:
            try:
               p=p.replace(" ","")
               data=data.replace(" ","")
            except:
               data=data 
            if(result_1(p,data)):
               return True
      return False  
            

def findMyKey(condition,Abbriviation,extractedList):
          
          length_1=len(condition)
          for format_types_number in range(length_1):
               length_2=len(condition[format_types_number])
               for format_number in range(length_2):
                    obj={}
                    variable_set_condition={}
                    found=re.findall(r"[{](.[\w\s]*)[}]",condition[format_types_number][format_number])
                    if(found):
                         found=set(found)
                         key_set_condition=found.copy()
                         for key in key_set_condition:
                              #  print(Abbriviation[format_types_number][format_number])
                               try:
                                     Abbriviation[format_types_number][format_number][key]
                                     pattern=Abbriviation[format_types_number][format_number][key]
                                  
                               except:    
                                     pattern=[]
                                     pattern.append(key.lower())
                               if(check_key(pattern,extractedList)):
                                      obj[key]=True 
                               else:
                                     obj[key]=False   
                                         
                    if obj!={}:     
                         if checkCondition(condition[format_types_number][format_number],obj,key_set_condition):
                                    return True
          return False                    

  
def ambigutyInKey(key,nextPossibleKey):
      bool_ambi=False
      for i in range(len(key)):
        pos=[]
        if(key[i]==None):
            if(nextPossibleKey[i]!=None and nextPossibleKey[i]!=""):
               start_2=i-1
               st=start_2
               oldkey=key[i-1]   
               while(start_2<=len(key) and nextPossibleKey[start_2]!=None ):
                        bool_ambi=True
                        if(key[start_2]!=None and start_2!=i-1):
                             start_2=start_2+1 
                             break
                        new_name=oldkey+" "+nextPossibleKey[start_2]
                       
                        key[start_2]=new_name
                        start_2=start_2+1 
                            
               i=start_2
                           
        
      if bool_ambi:
           return key
      return False         


def config_key(extracted_data,position,extracted_data_complete):
    if(extracted_data):
        try:
            posAmbiguty=ambigutyInKey(extracted_data,extracted_data_complete[position+1])                         
        except:
             posAmbiguty=False
        if(posAmbiguty):
            
          return posAmbiguty;
    return  extracted_data    

def checkDataRelated(list):
           count=0
           for i in list:
                try:
                    i=float(i)
                except:
                    i=i    
                if(type(i)==float):
                     count=count+1;
           if count>=2:
                return True
           return False


def checkendOfTable(list):
     for i in list:
          if i!=None and i!="":
               # print(repr(i))

               if i.lower()=="continued ..." :
                    return True
               else :
                    # print(r)
                    return False


def find_Data_Related(start,extractedData):
     listRelated=[]
     start_point=start+1
     Condition=True
     while(start_point<len(extracted_data)and Condition):
         
         if(checkDataRelated(extracted_data[start_point])):
               listRelated.append(extracted_data[start_point])
         elif checkendOfTable(extracted_data[start_point]):
              break      
         else:
              start_point=start_point+1
              continue
         
              
              
         start_point=start_point+1

     return start_point,listRelated
#main

list_Data=[]
condition,Abbriviation=findingCondition()
start=0
for i in range(start,len(extracted_data)):
         list_1=[] 
         if findMyKey(condition,Abbriviation,extracted_data[i]):
               key=config_key(extracted_data[i],i,extracted_data)
               list_1.append(key)

               start,list_result=find_Data_Related(i,extracted_data)
               for i in range(len(list_result)):
                  list_1.append(list_result[i]) 
               list_Data.append(list_1)

         else :
              print("check the pdf")
for i in list_Data:
     print(i)



#passing data to database function 

def connectMeDBMS(json_1):
      

     # Set the MongoDB connection parameters
     # Replace with your desired database name

    #make connection with data base
     #  mongodb_url = "mongodb://localhost:27017/"  # Replace with your MongoDB server URL
     #  database_name = "Hisabkaro" 
      
          
      # Connect to the MongoDB server
      print(json_1)
       # check_description(json_1)
      
      # below line will remove all the none:none extracted_data value pair from the file
      filtered_dict = {extracted_data: value for extracted_data, value in json_1.items() if extracted_data is not None and value is not None}
      print(filtered_dict)#clean data without the none:none pair

     #  client = pymongo.MongoClient(mongodb_url)
     #  print(client)
     #  database = client[database_name] 
     #  print(database)
     #  print("Connected to MongoDB successfully!")
     #  collection=database["helo123"]
     #  collection.insert_one(filtered_dict)
    



def pairMeup(listdata):
      i=1
      dict_1=[]
      while i<len(listdata):
            if(len(listdata[0])==len(listdata[i])):
               dict_={}
               # print(li)
               for k in range (len(listdata[0])):
                    dict_[listdata[0][k]]=listdata[i][k] 
               # print(i,dict_)
               dict_1.append(dict_)
               i=i+1 
            else:
                 i=i+1
                 continue   
      
      return dict_1
#this function is just destructuring a 2d array and paring it up an dthen passing the data to the database

def destructure_list(listdata):
    dict_=[]
    for j in range (len(listdata)) :
        list_1=pairMeup(listdata[j])
        
        for i in list_1:
            print("this is the i before teh connect to me dbms",i)  
            connectMeDBMS(i)

        dict_.append( pairMeup(listdata[j])) 
     
    return dict_     




list_dest=[]      
destructure_list(list_Data)

