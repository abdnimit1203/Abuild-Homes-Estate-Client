import { BsFillBuildingsFill } from "react-icons/bs";

import PropTypes from "prop-types";
const HeaderText = ({headerText, headerText2}) => {
    return (
        <div className="text-center py-10">
            <h2 className="text-xl md:text-3xl font-bold  mx-auto">{headerText}</h2>
            <h2 className="text-xl md:text-3xl font-bold  mx-auto">{headerText2}</h2>
            <div className="inline-flex items-center justify-center w-full">
    <hr className="h-px my-8 bg-gray-200  dark:bg-gray-700 w-[50%] mx-auto border-primary border-2"/>
    <span className="absolute px-3 font-medium text-base-100 -translate-x-1/2 bg-primary left-1/2 dark:text-white dark:bg-gray-900 rounded-xl"><BsFillBuildingsFill className="text-xl my-2 " />
</span>
</div>
          
        </div>
    );
};
HeaderText.propTypes = {
    headerText: PropTypes.string.isRequired,
    headerText2: PropTypes.string,
  };
export default HeaderText;