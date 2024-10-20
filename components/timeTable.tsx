interface PunchTime {
  punchTime: Date;
}

interface PunchProps {
  timeArray: PunchTime[];
}

export default function Table({ timeArray }: PunchProps) {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Time</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-400">
        {timeArray.map((eachTime, index) => (
          <tr key={index} className="bg-gray-400 text-center">
            <td className="px-16 py-2 flex flex-row items-center">
              <span className="text-center ml-2 font-semibold">
                {eachTime.punchTime.toLocaleString()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
