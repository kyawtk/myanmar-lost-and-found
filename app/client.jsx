import {createClient} from '@sanity/client'
import  imageUrlBuilder  from '@sanity/image-url'

export const client =  createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-08-14',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
 
const builder  =  imageUrlBuilder(client)

export const urlFor =(source)=>{
  return builder.image(source)
}