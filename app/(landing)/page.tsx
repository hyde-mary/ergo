import { Button } from "@/components/ui/button";
import { Heading } from "./_components/heading";
import { People } from "./_components/people";
import { Footer } from "./_components/footer";

const LandingPage = () => {
  return (    
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <People />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;