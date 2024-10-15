import { endpoint } from "@/src/api";
import { api } from "@/src/lib/api-client";

export interface GetAccountResponse {
  type: string;
  data: {
    id: number;
    ownerAddress: string;
    recipientAddress: string;
    network: string;
    version: string;
    nonce: number;
  };
}

export const getAccount = (account: string) =>
  api
    .get<GetAccountResponse>(endpoint("accounts", account))
    .then((res) => res.data);

export const getOwnerNonce = (account: string) =>
  getAccount(account).then((res) => res.nonce);
