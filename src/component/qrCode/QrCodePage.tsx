import React from "react";
import './QrCodePage.css';
import { Button, Input } from "antd";
import QRCode from "qrcode.react";

interface IQrCodePageState {
    id: string,
    name: string,
    modeId: string,
    venueId: string,
    restrictedVenueIds: string,
    fromPlaceId: string,
    toPlaceId: string,
    qrData:any
}

class QrCodePage extends React.Component<any, IQrCodePageState>{
    state: IQrCodePageState = {
        id: "",
        name: "",
        modeId: "",
        venueId: "",
        restrictedVenueIds: "",
        fromPlaceId: "",
        toPlaceId: "",
        qrData:"",
    }
    loginButtonClicked = () => {
        this.props.history.replace("/dashboard");
    }
    onQrCodeGenerateClicked = () => {
        const data: any = this.state;
        this.setState({qrData:JSON.stringify(data)});
    }
    render() {
        return (
            <div>
                <div className="w3-container w3-teal">
                    <h1>My Car</h1>
                </div>
                <div className="w3-row ">
                    <div className="w3-container w3-half">
                        <span>SKUs Id</span>
                        <Input className="w3-input" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} type="text" placeholder="Please enter SKUs ID" />

                        <span>SKUs Name</span>
                        <Input className="w3-input" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type="text" placeholder="Please enter SKUs Name" />

                        <span>Transport Mode Id</span>
                        <Input className="w3-input" value={this.state.modeId} onChange={(e) => this.setState({ modeId: e.target.value })} type="text" placeholder="Please enter Transport Mode Id" />

                        <span>Venue Id</span>
                        <Input className="w3-input" value={this.state.venueId} onChange={(e) => this.setState({ venueId: e.target.value })} type="text" placeholder="Please enter Venue Id" />
                        <span>Restricted venueId</span>
                        <Input className="w3-input" value={this.state.restrictedVenueIds} onChange={(e) => this.setState({ restrictedVenueIds: e.target.value })} type="text" placeholder="Please enter Restricted Venue Id" />
                        <span>Start Place Id</span>
                        <Input className="w3-input" value={this.state.fromPlaceId} onChange={(e) => this.setState({ fromPlaceId: e.target.value })} type="text" placeholder="Please enter Start Place Id" />

                        <span>End Place Id</span>
                        <Input className="w3-input" value={this.state.toPlaceId} onChange={(e) => this.setState({ toPlaceId: e.target.value })} type="text" placeholder="Please enter End Place Id" />
                        <br />
                        <br />
                        <Button onClick={this.onQrCodeGenerateClicked}>Generate QRCode</Button>
                    </div>
                    <div className="w3-container w3-half qrCode-image">
                    <QRCode value={this.state.qrData} height={"200"} width={"200"}/>
                    </div>
                </div>
            </div>)
    }

}

export default QrCodePage;