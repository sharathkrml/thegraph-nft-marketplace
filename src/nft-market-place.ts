import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/undefined/NftMarketPlace";
import {
  ActiveItem,
  ItemBought,
  ItemCancelled,
  ItemListed,
} from "../generated/schema";
export function handleItemBought(event: ItemBoughtEvent): void {
  // save event in graph
  // update activeItem
  // get or create ItemListed object
  // each item needs a unique id
  // we've itemBought event ,not object
  // ItemBoughtObject is what we save
  let itemBought = ItemBought.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
    );
    itemBought.buyer = event.params.buyer;
    itemBought.nftAddress = event.params.nftAddress;
    itemBought.tokenId = event.params.tokenId;
    activeItem!.buyer = event.params.buyer;
    itemBought.save();
    activeItem!.save();
  }
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCancelled = ItemCancelled.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemCancelled) {
    itemCancelled = new ItemCancelled(
      getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
    );
    itemCancelled.seller = event.params.seller;
    itemCancelled.nftAddress = event.params.nftAddress;
    itemCancelled.tokenId = event.params.tokenId;
    activeItem!.buyer = Address.fromString(
      "0x000000000000000000000000000000000000dEaD"
    );
    itemCancelled.save();
    activeItem!.save();
  }
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdfromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

const getIdfromEventParams = (tokenId: BigInt, nftAddress: Address): string => {
  return tokenId.toHexString() + nftAddress.toHexString();
};
