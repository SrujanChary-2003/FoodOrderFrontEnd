import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Header from "@/Components/ui/Header";


type Props = {
    children: React.ReactNode;
    showHero?: boolean;
};

const layout = ({children, showHero = false}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        {showHero && <Hero/>}
        
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer/>
        </div>
    );
}
export default layout;