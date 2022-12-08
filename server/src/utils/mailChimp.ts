import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER,
  });
const listId:any = process.env.LIST_ID;

const addMember=async(email:string)=>{
    try {

      const res= await mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: '',
              LNAME: ''
            }
          })

          return res;
        
    } catch (error:any) {
      // console.log(error.response.data.errors[0])
        return error;
    }
}


export {addMember}