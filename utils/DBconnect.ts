import mongoose from 'mongoose';


interface ConnectTypes {
  isConnected: boolean
  connections: any
}
const connection: ConnectTypes = {
  connections: [{}],
  isConnected: false
};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI as string, {
    // @ts-expect-error
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  // @ts-expect-error
  connection.isConnected = db.connections[0].readyState;

}

export default dbConnect;
