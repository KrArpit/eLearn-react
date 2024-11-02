import { Button } from "../ui/button"
import FormControls from "./formControls"

function CommonForm({handleSubmit, buttonText, formControls=[], formData, setFormData, isButtonDisabled = false}){
    return(
        <form onSubmit={handleSubmit}>
            {/* Render formcontrols from formControls.jsx */}
            <FormControls 
              formControls={formControls} 
              formData={formData} 
              setFormData={setFormData}/>
            <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm