import mongoose from "mongoose";

export interface Document extends mongoose.Document {
  document_name: string;
  data: object;
}
const documentSchema = new mongoose.Schema({
  document_name: { type: String, required: true },
  data: { type: Object, required: true },
});

const Document = mongoose.model<Document>("Document", documentSchema);
export default Document;
