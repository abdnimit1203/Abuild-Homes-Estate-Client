import HeaderText from "../../../components/HeaderText/HeaderText";

const MySoldProperties = () => {

    
  return (
    <>
    <div>
      <HeaderText headerText="My Sold Properties" />
  
    </div>
    
<div className="overflow-x-auto w-[90%] px-2 mx-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Property Title
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Property Location
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Buyer Name
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Buyer Email
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Sold Price
        </th>
        <th className="px-4 py-2"></th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      <tr>
        <td className="whitespace-wrap px-4 py-2 font-medium text-gray-900">
         dd
        </td>
        <td className="whitespace-wrap px-4 py-2 text-gray-700">24/05/1995</td>
        <td className="whitespace-wrap px-4 py-2 text-gray-700">Web Developer</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">dd</td>
        <td className="whitespace-nowrap px-4 py-2">
        $120,000
        </td>
      </tr>

     
    </tbody>
  </table>
</div>
    </>
  );
};

export default MySoldProperties;
