import MenuItem from "@/Components/MenuItem";
import OrderSummary from "@/Components/OrderSummary";
import RestaurantInfo from "@/Components/RestaurantInfo";
import { Card, CardFooter } from "@/Components/ui/card";
import { useGetRestaurant } from "@/api/RestaurantApi";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "./types";
import CheckoutButton from "@/Components/CheckoutButton";
import { UserFormData } from "@/Forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;

}

const DetailPage = () => {
  const { restaurantId} = useParams();
  const { restaurant, isLoading} = useGetRestaurant(restaurantId);
    const {  createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
    const [cartItems, setCartItems] = useState<CartItem[]>(()=> {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems? JSON.parse(storedCartItems) : [];
        
    });
    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems)=> {
             const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id )
        
            let updatedCartItems;
             if(existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id? { ...cartItem, quantity: cartItem.quantity +1 }: cartItem );
             } else
             {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
             }

             sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

             return updatedCartItems;
            });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems)=> {
          const updatedCartItems = prevCartItems.filter(
            (item) => cartItem._id !== item._id
          );

           sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

          return updatedCartItems;
        })
    }

    const onCheckout = async (userFormData: UserFormData) => {
        if(!restaurant)
            {
                return;
            }
        console.log("userFormData", userFormData)
    
        const checkoutData = {
            cartItems: cartItems.map((cartItem)=> ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity,
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        };
    const data = await createCheckoutSession(checkoutData)
    window.location.href = data.url;  
    }

    if(isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img className="rounded-md object-cover h-full w-full" src={restaurant.imageUrl} alt="Restaurant Image Unable To Load" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
                <div className="flex flex-col gap-4">
                        <RestaurantInfo restaurant={restaurant} />
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {restaurant.menuItems.map((menuItem) => (
                    <MenuItem menuItem={menuItem} addToCart={()=> addToCart(menuItem)} />
                ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} CartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default DetailPage;


