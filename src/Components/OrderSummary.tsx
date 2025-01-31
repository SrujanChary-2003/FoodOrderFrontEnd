import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/pages/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  CartItems: CartItem[];
  removeFromCart: (cartItem: CartItem)=> void
}

const OrderSummary = ({restaurant, CartItems, removeFromCart}: Props) => {
  
    const getTotalCost = () => {
    const  totalInPense = CartItems.reduce((total, cartItem)=> total+cartItem.price * cartItem.quantity, 0);

    const totalWithDelivery = totalInPense+ restaurant.deliveryPrice;

    return (totalWithDelivery/100).toFixed(2);

    }
  
    return (
    <>
    <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
            <span>Your Order</span>
            <span>₹{getTotalCost()}</span>
        </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
            {
                CartItems.map((item)=> (
                    <div className="flex justify-between">
                        <span >
                            <Badge className="mr-2" variant="outline" >
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer" color="red" size={20} onClick={()=> removeFromCart(item)} />
                        ₹{((item.price * item.quantity )/100).toFixed(2)}
                        </span>
                    </div>
                ))
            }
            <Separator/>
            <div className="flex justify-between ">
                <span>
                    Delivery
                </span>
                <span>₹{(restaurant.deliveryPrice/100).toFixed(2)}</span>
            </div>
            <Separator/>
    </CardContent>
    </>
  )
}

export default OrderSummary;