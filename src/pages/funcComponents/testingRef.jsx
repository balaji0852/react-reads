


import { React, forwardRef, useEffect, useReducer, useRef, useState } from "react";
import { Button } from "reactstrap";
import "../../App.css"


export const TestingRef = forwardRef(({ }, ref) => {



    return <><h1>
        shit overloaded
    </h1>
        <input type="text" ref={ref} />
    </>
})


export const useCustomHookDevelopment = (props) => {
    const [tag, setTag] = useState(false);


    useEffect(() => {

        console.log("effected use")
        setTag(!tag);



        return () => {
            console.log("cleanup")
        }
    },
        [props.parentName])


}



export const TestingForwardRef = () => {
    const refToBePassedForInputTextBox = useRef(null);
    const [value, setValue] = useState("empty");

    useCustomHookDevelopment({ parentName: refToBePassedForInputTextBox.current != null ? refToBePassedForInputTextBox.current.value : "demo" });

    function getRefValue() {
        console.log(refToBePassedForInputTextBox.current.value)
        let value = refToBePassedForInputTextBox.current.value;
        setValue(value);
    }




    return <>
        <h2>value from ref :{value}</h2>
        <Button onClick={() => getRefValue()}>Get</Button>
        <TestingRef ref={refToBePassedForInputTextBox} />
    </>


}


export const UpdaterFunctionDemo = () => {

    const [value, setValue] = useState(0);

    function eventHandler() {
        setValue((value) => value + 5);
        //since same value is forwarded to the react queue, so need to use 
        //updater function to perform this, below lines doesn't update the
        //value, where as line  above the comment does...
        setValue(value + 5);
        setValue(value + 5);
        setValue(value + 5);
    }

    function mutateState() {
        setValue("mutation begins here...")
    }




    return <div>
        <br />
        <br />
        <br />
        <Button onClick={() => eventHandler()}>+5</Button>
        <br />
        <Button onClick={() => mutateState()}>mutate</Button>
        <h1>current value : {value}</h1>
    </div>
}



export const TestingUseRef = () => {
    // You can mutate the ref.current property. Unlike state, it is mutable. 
    // However, if it holds an object that is used for rendering (for example, 
    //     a piece of your state), then you shouldn’t mutate that object.
    // conclusion, if you mutate its of no use since the updated value doesn't appear in UI
    const [testObject, setTestObject] = useState({ "job": "developer", "salary": "10 grand" })
    const testingUseRefWithAboveCase = useRef(testObject)
    const [rendered, setRendered] = useState(10)

    function mutateCurrentState() {
        console.log(testingUseRefWithAboveCase.current)
        testingUseRefWithAboveCase.current = { "job": "developer", "salary": "9000$" }
    }


    return <div>
        <br />
        <br />
        <h1 onClick={() => {

            setRendered((rendered) => rendered + 1)
        }}>rendered :{rendered}</h1>
        <br />
        <Button onClick={() => mutateCurrentState()}>mutate object</Button>
        <br />
        <h1>current state : {JSON.stringify(testObject)}</h1>
    </div>

}



//useReducer
function testingReducer(state, action) {
    switch (action.type) {
        case "hello_world": {
            return {
                message: action.message
            }
        }
        case "create_function": {
            return {
                message: "function " + action.message + "(){}"
            }
        }
        default: {
            return { message: "no inputs, yet" };
        }

    }
}



export const NewReducerInsteadOfState = () => {

    function init(value) {
        return {
            message: value.message + "<-"
        }
    }
    const [state, dispatch] = useReducer(testingReducer, { message: "no inputs, yet" }, init)
    const [functionName, setFunctionName] = useState("")

    function createFunction() {
        dispatch({
            type: "create_function",
            message: functionName
        })
    }

    function createHelloWorld(functionName) {
        dispatch({
            type: "hello_world",
            message: functionName
        })
    }


    function inputChange(event) {
        setFunctionName(event.target.value)
    }

    function resetUpdate() {
        dispatch({
            type: "shit"
        })
    }


    return <div className="flex block">
        <br />
        <br />
        <h1>output : {state.message}</h1>
        <br />
        <input type="text" onChange={(e) => inputChange(e)} value={functionName} />
        <br/>
        <Button onClick={() => createHelloWorld("hello world")}>hello world</Button>
        <br />
        <Button onClick={createFunction}>create a function</Button>
        <br />
        <Button onClick={resetUpdate}>Reset</Button>
    </div>


}


export const Counter = ()=>{
    const [tick,setTick] = useState(0);

    useEffect(()=>{
        setTimeout(()=>{
            setTick(tick+1)
        },1000)
    },[tick])


    return <div>
        <h1>amount credited  : {tick}$</h1>
    </div>
}