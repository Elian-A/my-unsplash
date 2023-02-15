import FormInput from "./formInput";

const AddModal = () => {
  return (
    <article className="grid gap-4 font-sans">
      <h3 className="text-xl">Add new photo</h3>
      <div className="grid gap-4">
        <FormInput label="Label" placeholder="Suspendisse elit massa" />
        <FormInput
          label="Url"
          placeholder="https://images.unsplash.com/photo-1676348879583-fd7e0fd5514c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
      </div>
      <div className="flex justify-end gap-8 align-middle">
        <button className="text-sm text-neutral-600">cancel</button>
        <button className="rounded-xl bg-primary-500 px-5 py-3 font-bold text-white">
          Submit
        </button>
      </div>
    </article>
  );
};
export default AddModal;
