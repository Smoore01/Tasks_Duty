import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../img/slide1.png';
import slide2 from '../img/slide2.png';
import slide3 from '../img/slide3.png';

export default function CoverPage() {

    const images = [
        slide1,
        slide2,
        slide3
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId); 
    }, [images.length]);

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-24 px-4 sm:px-8 lg:px-12">
         
            <div className="lg:w-1/2 max-w-lg mb-12 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
                    Manage your Tasks on
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-purple-600 mb-6">
                    TaskDuty
                </h1>

                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.
                </p>

                <Link
                    to="/tasks"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                    Go to My Tasks
                </Link>
            </div>


            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
                <div className="relative w-full sm:max-w-md lg:max-w-lg aspect-square sm:aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`TaskDuty Illustration ${index + 1}`}
                                className="w-full h-full object-contain p-2 sm:p-4"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
