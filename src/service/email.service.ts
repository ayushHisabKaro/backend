// import * as sgMail from '@sendgrid/mail';
// console.log(sgMail);
console.log('SENDGRID_API_KEY ' + process.env.SENDGRID_API_KEY);

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// export const sendEmail = async (
//   to: string,
//   subject: string,
//   text: string,
//   html: string,
// ) => {
//   const msg = {
//     to, // Change to your recipient
//     from: 'info@cosmiccandy.in', // Change to your verified sender
//     subject,
//     text,
//     html,
//   };
//   try {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const result = await sgMail.send(msg);
//     console.log(result, ' Email sent');
//     return result;
//   } catch (error) {
//     console.error(error.response.body.errors);
//     throw error;
//   }
// };

export default {};
