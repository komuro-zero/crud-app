interface SegmentedTime {
  year: string;
  month: string;
  day: string;
  hourMinute: string;
}

interface PunchProps {
  timeArray: SegmentedTime[];
}

export default function Table({ timeArray }: PunchProps) {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Year</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Month</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Day</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Time</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-400">
        {timeArray.map((eachTime, index) => (
          <tr key={index} className="bg-gray-400 text-center">
            <td className="px-16 py-2">
              <span className="font-semibold">{eachTime.year}</span>
            </td>
            <td className="px-16 py-2">
              <span className="font-semibold">{eachTime.month}</span>
            </td>
            <td className="px-16 py-2">
              <span className="font-semibold">{eachTime.day}</span>
            </td>
            <td className="px-16 py-2">
              <span className="font-semibold">{eachTime.hourMinute}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
