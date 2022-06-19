import { Injectable } from '@angular/core';
import { Blockchain } from  './src/blockchain.js';
import EC from "elliptic";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public walletKeys = [];
  constructor() { }
}
