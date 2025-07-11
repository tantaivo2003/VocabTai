export interface Vocabulary {
  id: number;
  word: string;
  meaning: string;
  context: string;
  pronunciation: string;
  topic_id: number;
  Topic?: {
    id: number;
    name: string;
    description?: string;
  };
}
