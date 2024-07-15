import { Component } from "react";
import code from './code.png';
import bin from './bin.png';

export class List extends Component {
    state = {
        userInput: "",
        userNumber: "",
        selectedOption: "",
        arrayGeneral: [],
        time: new Date().toLocaleTimeString(),
        date: new Date().toDateString()
    }

    componentDidMount(){
        this.timerID = setInterval(() =>
            this.tick(), 1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        })
    }


    
    onChangeEvent(e){
        this.setState({ userInput: e })
    }
    onChangeNumber(e){
        this.setState({ userNumber: e })
    }
    changeOption(e){
        this.setState({ selectedOption: e })
    }

    addElement(input, amount, time){
        if( input === "" || amount === ""){
            alert("Please, fill the form")
        }
        else {
            let userArray = this.state.arrayGeneral;
            userArray.push(input + " | " + amount + " " + time);
            this.setState({
                arrayGeneral: userArray, 
                userInput: "", 
                userNumber: "", 
                selectedOption: time
            })
        }
    }
    crossedLine(e){
        const item = e.target;
        item.classList.toggle("crossed")
    }

    deleteList = () => {
        let userArray = this.state.arrayGeneral;
        userArray.length = 0;
        this.setState( { arrayGeneral: userArray } )
    }

    selectedDelete = (index) => {
        this.setState({
            arrayGeneral: this.state.arrayGeneral.filter((e, i) => {
                return i !== index
            })
        })

    }

    onSubmitEvent(e){
        e.preventDefault();
    }

    render(){
        return(
            <form onSubmit={ this.onSubmitEvent }>
                <div className="big-container">
                    <div className="container-input">                    
                        <div>
                            <input type="text" placeholder="Goal"
                            onChange={(e) => { this.onChangeEvent(e.target.value)} } 
                            value={ this.state.userInput } />
                        </div>

                        <div>
                            <input type="number" placeholder="Time/ Money/ Amount"
                            onChange={(e) => { this.onChangeNumber(e.target.value) }}
                            value={this.state.userNumber}
                            />
                        </div>
                        <div>
                            <select onChange={(e) => { this.changeOption(e.target.value) }}>
                                <option value=" ">None</option>
                                <option value="min">minute(-s)</option>
                                <option value="h">hour(-s)</option>
                                <option value="d">day(-s)</option>
                                <option value="m">month(-s)</option>
                                <option value="y">year(-s)</option>
                                <option value="$">$</option>
                            </select>
                        </div>
                        <div>
                            <button className="add-btn" onClick={() => { this.addElement(this.state.userInput, this.state.userNumber, this.state.selectedOption)} } >+</button>
                        </div>                   
                    </div>
                    <div className="receipt-container">
                        <div className="container">
                            <h2>RECEIPT</h2>
                            <p className="title">your track-list</p>
                        </div>
                        <div className="date">
                            <p><span className="color">TIME: </span>{ this.state.time }</p>
                        </div>
                        <div>
                            <div className="headerItems">
                                <p className="color">ITEM | COST</p>
                                <p className="color">DELETE</p>
                            </div>
                            <ul>
                                {this.state.arrayGeneral.map((item, id) => 
                                    <li onClick={ this.crossedLine } key={ id } width="200px">
                                        <span className="lineThrough">{ item }</span>
                                        <img className="binImg" src={bin} alt="bin" onClick={ this.selectedDelete.bind(this, id) } width="17px"/>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className=" btn-box">

                            <div className="bottom-box">
                                <p><span className="color">CARD: </span>XX<span className="color">LUCKY</span>XXX<span className="color">YOU</span></p>
                                <p><span className="color">AUTH: </span>666777888666777888</p>
                                <p><span className="color">CARDHOLDER: </span>SUNSHINE</p>
                                <p><span className="color">DATE: </span>{ this.state.date }</p>
                            </div>
                            <div className="container">
                                <img src={ code } alt="QR code"/>
                                <button className="clear-btn" onClick={ this.deleteList }>Clear all</button>
                            </div>
    
                        </div>
                        
                    </div>



                </div>
            </form>
        )
    }
}