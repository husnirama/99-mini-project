import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TransactionLifecycleRecord, TransactionRecord } from "@/types/orderTransactionTypes";
import { mergeTransactionUpdate } from "@/utils/orderTransaction.utils";

interface TransactionState {
  records: Record<number, TransactionLifecycleRecord>;
  lastTransactionId: number | null;
  saveRecord: (record: TransactionLifecycleRecord) => void;
  saveRecords: (records: TransactionLifecycleRecord[]) => void;
  updateTransaction: (transactionId: number, transaction: TransactionRecord) => void;
  updateRecord: (
    transactionId: number,
    updater: (record: TransactionLifecycleRecord) => TransactionLifecycleRecord,
  ) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      records: {},
      lastTransactionId: null,

      saveRecord: (record) =>
        set((state) => ({
          records: {
            ...state.records,
            [record.transaction.id]: record,
          },
          lastTransactionId: record.transaction.id,
        })),

      saveRecords: (records) =>
        set((state) => {
          const nextRecords = { ...state.records };

          records.forEach((record) => {
            nextRecords[record.transaction.id] = record;
          });

          return {
            records: nextRecords,
            lastTransactionId:
              records[0]?.transaction.id ?? state.lastTransactionId,
          };
        }),

      updateTransaction: (transactionId, transaction) =>
        set((state) => {
          const currentRecord = state.records[transactionId];

          if (!currentRecord) {
            return state;
          }

          return {
            records: {
              ...state.records,
              [transactionId]: mergeTransactionUpdate(currentRecord, transaction),
            },
          };
        }),

      updateRecord: (transactionId, updater) =>
        set((state) => {
          const currentRecord = state.records[transactionId];

          if (!currentRecord) {
            return state;
          }

          return {
            records: {
              ...state.records,
              [transactionId]: updater(currentRecord),
            },
          };
        }),
    }),
    { name: "transaction-store" },
  ),
);
