import connect from "../../util/database2";


export default async function handler(req: any, res:any) {
    const { db } = await connect();

    try {
        const response = await db.collection("customers").find().toArray();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error });
    }
}