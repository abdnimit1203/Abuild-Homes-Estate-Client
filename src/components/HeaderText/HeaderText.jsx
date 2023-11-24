
import PropTypes from "prop-types";
const HeaderText = ({headerText}) => {
    return (
        <div className="text-center py-10">
            <h2 className="text-xl md:text-3xl font-bold  mx-auto">{headerText}</h2>
            <hr className="w-[50%] mx-auto mt-4 border-primary border-2" />
        </div>
    );
};
HeaderText.propTypes = {
    headerText: PropTypes.string.isRequired,
  };
export default HeaderText;