import lanndingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-1g shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            Tuck into a TakeWay Today
          </h1>
          <span className="text-xl">Food is just a click away</span>
        </div>
        <div className="grid md:grid-col-2 gap-5">
          <img src={lanndingImage} />
          <div className="flex flex-col items-center justify-center gap-4 text-center ">
              <span className="font-bold text-3xl tracking-tighter">
                Order Takeaway even faster
              </span>
              <span>
                Download the TheBoysFoos App for faster ordering and personalised recommendations
              </span>
              <img src={appDownloadImage}/>
          </div>
        </div>
    </div>
  )
}

export default HomePage;