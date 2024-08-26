import getCurrentUser from "@/app/actions/getCurrentUser";
import { json } from "stream/consumers";

export async function POST(request:Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json();

        
    } catch (error: any){
        return null
    }
    
}