// import { MenuItem } from "@/pages/types";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// type Props = {
//   menuItem: MenuItem;
// }

// const MenuItem = ({menuItem}: Props) => {
//   return (
//     <Card className="cursor-pointer">
//         <CardHeader>
//             <CardTitle>
//                 {menuItem.name}
//             </CardTitle>
//         </CardHeader>
//         <CardContent className="font-bold">
//         \u20A8{(menuItem.price / 100).toFixed(2)}
//         </CardContent>
//     </Card>
//   )
// }

// export default MenuItem;
import type { MenuItem as MenuItemType } from "@/pages/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
}

const MenuItem = ({menuItem, addToCart}: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
        <CardHeader>
            <CardTitle>
                {menuItem.name}
            </CardTitle>
        </CardHeader>
        <CardContent className="font-bold">
        ₹{(menuItem.price / 100).toFixed(2)}
        </CardContent>
    </Card>
  )
}

export default MenuItem;
