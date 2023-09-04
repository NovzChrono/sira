
import prisma from '@/app/libs/prismadb';

export default async function getListings(){
    try {

        const listings = await prisma.listing.findMany({
            orderBy : {
                createdAt : 'desc',
            }
        });
        
        
        const sageListings = listings.map((listing) => ({
            ...listing,
            createdAt : listing.createdAt.toISOString(),
        }));
        
        return sageListings;
    } catch (e : any){
        return new Error(e);
    }
}