import sys
# import pymongommit_
import pdfplumber
import re
import json as js
# import pandas as pd


# Open the PDF file
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
new_1=[]
json_data_list=[]
start=0
hello=[]


# # filter out the extra garbage value from the extracted_data value pair made below Specially' /n'
# def filteringextracted_data(nonNormalextracted_data):
#      extracted_data=nonNormalextracted_data.extracted_data()
#      print(extracted_data)

# for amazon type of cases
 
def check_description(value):
     extracted_data=value.extracted_data()
     for i in extracted_data:
          pattern="Description|desc|productName|Description of Good |DESC|ITEM NAME|item name|item Description" #it contains all the extracted_data for the description of good
          if(result_1(pattern,i)):
               if(result_1("\\n",value[i])):
                   search_pattern_hsn=r"HSN|hsn+\d"
                   value_hsn=re.search(pattern,value[i])
               return 
          


#serach the pattern specified by its calling function if the match is found than it returns true else false
def result_1(pattern,data):
     result=False
     if type(data)==str:
        if re.search(pattern,data):
              result=True
     return result

# these all are the extracted_data  like srno quantity and hsn code ,
# check the extracted_data location if present then return position of the extracted_data else return true


def srno(extracted_list): #extracted_data
#     print("hello")
    pattern_srno=r"^(srno|Sr.\nNo|s.no|Sr.no|Sr.\nNo.|SR|SR.NO|Sl.\nNo|Sl\nNo.|SL.\nNO|SRNO|S.No|SR_NO|SR.\nNO)"
    for i in range(len(extracted_list)):
         if(result_1(pattern_srno,extracted_list[i])):
               return i+1
    return False
    
def Quantity(extracted_list):#extracted_data location
      # print("hello")
      pattern_desc=r"^(Qtn|qtn|quantity|Quantity|Qty|qty)"
      for i in range(len(extracted_list)):
         if(result_1(pattern_desc,extracted_list[i])):
                    return i+1
      return False

def hsnCode(extracted_list): #extracted_data
      # print("hello")
      pattern_desc=r"^(HSN/SAC|HSN|HSN/S\nAC|hsncode|HsnCode|HSN NO|Hsn no)"
      for i in range(len(extracted_list)):
    
         if(result_1(pattern_desc,extracted_list[i])):                  
                    return i+1
      return False



def find_Data_Related(caller,start,extracted_data,position):

      #extracted data and keys are found, now we need to find the data related to it 
      start_1=start
      list_1=[]
      true123=True
      while(start<len(extracted_data) and true123):
          

            if extracted_data[start]:                   
                   if type(extracted_data[start][position-1])==str:
                        if(extracted_data[start][position-1]!="" ):
                              # print("hello data",extracted_data[start])

                              if(caller== "srno"):
                                    pattern=r"^(\d)"
                              elif(caller=="quantity"):
                                    pattern=r"^(\d)" 
                              elif(caller=="HSN") :
                                    pattern=r"^(\d{4,8})"
                              else :
                                   print("difficulty reading the code")                             

                              result_1=re.search(pattern,extracted_data[start][position-1])
                              
                              if result_1 :
                                 list_1.append(extracted_data[start])
                              else: 
                                    start=start+1
                                    break   
                        elif(start<=start_1+4 ):
                             start=start+1
                             continue

                        else:
                             start=start+1
                             break    
                            
            start=start+1 
            print("list",list_1,"inside the s",start)           
      return [start,list_1]                  

#passing data to database function 

def connectMeDBMS(json_1):

     # Set the MongoDB connection parameters
     # Replace with your desired database name

    #make connection with data base
      # mongodb_url = "mongodb://localhost:27017/"  # Replace with your MongoDB server URL
      # database_name = "HisabKaro" 
      
          
      # Connect to the MongoDB server
      print(json_1)
       # check_description(json_1)
      
      # below line will remove all the none:none extracted_data value pair from the file
      filtered_dict = {extracted_data: value for extracted_data, value in json_1.items() if extracted_data is not None and value is not None}
      print(filtered_dict)#clean data without the none:none pair

      # client = pymongo.MongoClient(mongodb_url)
      # print(client)
      # database = client[database_name] 
      # print(database)
      # print("Connected to MongoDB successfully!")
      # collection=database["helo123"]
      # collection.insert_one(filtered_dict)
    
def ambigutyInKey(key,nextPossibleKey):
      print(key,nextPossibleKey,"this is the keys")
      for i in range(len(key)):
        pos=[]
        if(key[i]==None):
            if(nextPossibleKey[i]!=None and nextPossibleKey[i]!=""):
               start_2=i-1
               st=start_2
               oldkey=key[i-1]   
               while(start_2<=len(key) and nextPossibleKey[start_2]!=None ):
                        
                        if(key[start_2]!=None and start_2!=i-1):
                             start_2=start_2+1 
                             break
                        new_name=oldkey+" "+nextPossibleKey[start_2]
                       
                        key[start_2]=new_name
                        start_2=start_2+1 
                            
               i=start_2
                           
        
      print("thisfsdfsdfgsdf",key)
      return False         


def config_key(extracted_data,position,extracted_data_complete):
    if(extracted_data):
        try:
            posAmbiguty=ambigutyInKey(extracted_data,extracted_data_complete[position+1])    
            print(posAmbiguty,"posAmbiguty")                          
        except:
             posAmbiguty=False
        if(posAmbiguty):
            
          return posAmbiguty;
    return  extracted_data    
      


#main function

list_Data=[]


for i in range(start,len(extracted_data)):
        list_1=[]
        if( srno(extracted_data[i]) ):
              position=srno(extracted_data[i]);
              extracted_data_list=config_key(extracted_data[i],i,extracted_data);
              list_1.append(extracted_data_list)
              start,list_result=find_Data_Related("srno",i+1,extracted_data,position)
              for i in range(len(list_result)):
                  list_1.append(list_result[i])
              list_Data.append(list_1)

        elif(hsnCode(extracted_data[i])):
              position=hsnCode(extracted_data[i]);
              extracted_data_list=config_key(extracted_data[i],i,extracted_data);
              list_1.append(extracted_data_list)
              start,list_result=find_Data_Related("HSN",i+1,extracted_data,position)
              for i in range(len(list_result)):
                  list_1.append(list_result[i])
              list_Data.append(list_1)

        elif(Quantity(extracted_data[i])):
              position=Quantity(extracted_data[i])
              extracted_data_list=config_key(extracted_data[i],i,extracted_data);
              list_1.append(extracted_data_list)
              start,list_result=find_Data_Related("quantity",i+1,extracted_data,position)
              for i in range(len(list_result)):
                  list_1.append(list_result[i])
              list_Data.append(list_1)
        else:
            print("You encountered a problem in reading the pdf ")
            print("Quantity( )",Quantity(extracted_data[i]))
            print("hsnCode(extracted_data[i])",hsnCode(extracted_data[i]))
            print("srno(extracted_data[i])",srno(extracted_data[i]))

#this function is use to pair the extracted_data value pair

def pairMeup(listdata):
      i=1
      dict_1=[]
      while i<len(listdata):
            dict_={}
            # print(li)
            for k in range (len(listdata[0])):
                 dict_[listdata[0][k]]=listdata[i][k] 
            # print(i,dict_)
            dict_1.append(dict_)
            i=i+1 
      
      return dict_1

#this function is just destructuring a 2d array and paring it up an dthen passing the data to the database

def destructure_list(listdata):
    dict_=[]
    for j in range (len(listdata)) :
        list_1=pairMeup(listdata[j])
        print(list_1)
        for i in list_1:
            print("this is the i before teh connect to me dbms",i)  
            connectMeDBMS(i)

        dict_.append( pairMeup(listdata[j])) 
     
    return dict_     




list_dest=[]      
destructure_list(list_Data)

