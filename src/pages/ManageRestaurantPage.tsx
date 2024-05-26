// import ManageRestaurantForm from "@/Forms/manage-restaurant-form/ManageRestaurantForm";
// import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";

// const ManageRestaurantPage = () => {
//     const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
//     const { restaurant} = useGetMyRestaurant();
//     const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateMyRestaurant();
//     const isEditing = !!restaurant;
//     return (
//     <ManageRestaurantForm 
//     restaurant={restaurant}
//     onSave={isEditing? updateRestaurant: createRestaurant} 
//     isLoading={isCreateLoading || isUpdateLoading} />
//   );

// }

// export default ManageRestaurantPage;

import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/Components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ManageRestaurantForm from "@/Forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} Active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;