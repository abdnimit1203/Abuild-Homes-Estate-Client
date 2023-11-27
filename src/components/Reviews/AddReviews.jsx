
const AddReviews = () => {
    return (
        <div className="p-4 border-2 rounded-2xl my-4 space-y-3">
          <h2 className="text-xl font-bold">Reviews</h2>
          <hr />
          <div className="flex gap-6 flex-col md:flex-row">
            <p>You can view and also add review for this property here</p>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-warning btn-sm"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add a review
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box bg-warning">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg ">Add you reviews here</h3>
                <form onClick={()=>toast("review added")}>
                    <input type="text" placeholder="your review" />
                    <input type="submit" />
                </form>
              </div>
            </dialog>
          </div>
        </div>
    );
};

export default AddReviews;