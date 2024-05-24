import { NetworkInterface } from "./core_interface";

export enum NETWORKS_SLUG {
  MAINNET = "mainnet",
  SPOLIA = "spolia",
  LOCAL = 'local'
}

export const NETWORKS: { [key in NETWORKS_SLUG]: NetworkInterface } = {
    [NETWORKS_SLUG.MAINNET]: {
        chain_id: 1,
        rpc_url: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    },
    [NETWORKS_SLUG.SPOLIA]: {
        chain_id: 1,
        rpc_url: "",
    },
    [NETWORKS_SLUG.LOCAL]: {
        chain_id: 5777,
        rpc_url: 'http://127.0.0.1:7545'
    }
};
