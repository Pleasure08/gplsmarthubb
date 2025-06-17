import Image from "next/image"
import Link from "next/link"
import { Hostel } from "@/types/hostel"

interface HostelCardProps {
  hostel: Hostel
}

export default function HostelCard({ hostel }: HostelCardProps) {
  return (
    <Link href={`/hostels/${hostel.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          {hostel.imageUrls && hostel.imageUrls.length > 0 ? (
            <Image
              src={hostel.imageUrls[0]}
              alt={hostel.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{hostel.name}</h3>
          <p className="text-gray-600 mb-2">{hostel.location}</p>
          <p className="text-green-600 font-semibold">₦{hostel.pricePerYear.toLocaleString()} per year</p>
        </div>
      </div>
    </Link>
  )
} 