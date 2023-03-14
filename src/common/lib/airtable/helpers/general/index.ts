import { FieldSet, Records, Table } from "airtable";

interface IRecordWithId<T> {
  recordId: string;
  data: T;
}

export const getMinifiedRecords = <T>(
  records: Records<FieldSet>
): IRecordWithId<T>[] => {
  return records.map<IRecordWithId<T>>(({ fields, id }) => ({
    recordId: id,
    data: fields as T,
  }));
};

export const getMinifiedRecord = <T>(
  records: Records<FieldSet>
): IRecordWithId<T> | undefined => {
  return getMinifiedRecords<T>(records).at(0);
};

export const findRecords = async <T>({
  tableModel,
  filter,
  maxQuantity,
}: {
  tableModel: Table<FieldSet>;
  filter?: string;
  maxQuantity?: number;
}) => {
  return await tableModel
    .select({
      filterByFormula: filter,
      maxRecords: maxQuantity,
    })
    .firstPage();
};
