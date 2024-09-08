export default function Table() {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-400">
        <tr className="bg-gray-400 text-center">
          <td className="px-16 py-2 flex flex-row item-center">
            <img src="#" alt=""></img>
            <span className="text-center ml-2 font-semibold">Sample Name</span>
          </td>
          <td className="px-16 py-2">
            <span>sample@email.com</span>
          </td>
          <td className="px-16 py-2">
            <span>1000</span>
          </td>
          <td className="px-16 py-2">
            <span>1999/1/1</span>
          </td>
          <td className="px-16 py-2">
            <span>LIve</span>
          </td>
          <td className="px-16 py-2">
            <span>delete</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
