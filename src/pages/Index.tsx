
import React from "react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColorClass: string;
  textColorClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  bgColorClass,
  textColorClass = "text-white"
}) => {
  return (
    <div className={`rounded-xl p-8 ${bgColorClass} ${textColorClass} h-full flex flex-col justify-between relative overflow-hidden min-h-[400px]`}>
      <div>
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8">{description}</p>
      </div>
      
      <div>
        <Button 
          variant={title === "Rides" ? "default" : "secondary"}
          className={`px-6 py-2 font-medium ${title === "Rides" ? "bg-[#34A853] hover:bg-[#2E9748] text-white" : "bg-white text-black hover:bg-gray-100"}`}
          asChild
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center text-black mb-6">Our services</h1>
        
        <p className="text-xl text-center text-gray-600 mb-20 max-w-3xl mx-auto">
          Products and features vary by country. Some features listed here may not be available in your app.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-xl" style={{backgroundImage: 'url(/lovable-uploads/fbc8d5d0-1c8a-4c4f-8f15-8dcd3749baf5.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <ServiceCard
              title="Rides"
              description="Request in seconds, ride in minutes."
              buttonText="Get started"
              buttonLink="#"
              bgColorClass="bg-[#0B2716]/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="relative overflow-hidden rounded-xl" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <ServiceCard
              title="Delivery"
              description="Your favourite food, delivered fast."
              buttonText="Go to Bolt Food"
              buttonLink="#"
              bgColorClass="bg-[#1A3953]/70 backdrop-blur-sm"
            />
          </div>
          
          <div className="relative overflow-hidden rounded-xl" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <ServiceCard
              title="Car-sharing"
              description="High-quality car rental made easy."
              buttonText="Go to Bolt Drive"
              buttonLink="#"
              bgColorClass="bg-black/60 backdrop-blur-sm"
            />
          </div>
          
          <div className="relative overflow-hidden rounded-xl" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <ServiceCard
              title="Groceries"
              description="All the essentials you need."
              buttonText="Go to Bolt Market"
              buttonLink="#"
              bgColorClass="bg-[#4D7A3E]/60 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
