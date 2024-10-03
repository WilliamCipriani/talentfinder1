import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-[450px] h-[400px] flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gray-300 rounded-full h-10 w-10 flex-shrink-0"></div>
          <div>
            <h4 className="text-lg font-bold">{job.company}</h4>
            <p className="text-gray-600 text-sm">{job.type}</p>
          </div>
        </div>

        <h5 className="text-md font-bold mb-2">{job.title}</h5>
        <p className="text-gray-800 text-sm mb-2">{job.location}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
        <p className="text-gray-600 text-xs mb-6">hace {job.daysPosted} días</p>
      </div>

      <Link href={`/inicio/${job.id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-center block mt-auto">
          Aplicar
      </Link>
    </div>
  );
}



