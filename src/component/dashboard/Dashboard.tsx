import React from "react";
import './Dashboard.css';
import { AutoComplete, Input, Button, Modal } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { QrcodeOutlined } from '@ant-design/icons';
// import Webcam from "react-webcam";
import QrReader from "react-qr-reader";
// import BarcodeReader from "react-barcode-reader";


interface IDashboardState {
    SKUsData: any[],
    screenshot: any,
    qrCodeResult: any,
    qrScannVisible: boolean,
    isQrCodeClicked: boolean
}
interface IDashboardProps extends RouteComponentProps {

}
class Dashboard extends React.Component<IDashboardProps, IDashboardState>{
    webcamReference: any = React.createRef();

    constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            qrCodeResult: '',
            qrScannVisible: false,
            isQrCodeClicked: false,
            screenshot: '',
            SKUsData: [
                {
                    id: "13234",
                    name: 'SKU13234',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "13236",
                    name: 'SKU13236',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe52d53f617b00163242a9",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "13235",
                    name: 'SKU13235',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe52d53f617b00163242a9",
                    toPlaceId: "5ebe52c532b38a00168c4342"
                },
                {
                    id: "13249",
                    name: 'SKU13249',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52c532b38a00168c4342"
                },
                {
                    id: "13250",
                    name: 'SKU13250',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe52dc3f617b00163242ab",
                    toPlaceId: "5ebe52b83f617b00163242a7"
                },
                {
                    id: "13251",
                    name: 'SKU13251',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe52dc3f617b00163242ab",
                    toPlaceId: "5ebe52c532b38a00168c4342"
                },
                {
                    id: "13252",
                    name: 'SKU13252',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "13253",
                    name: 'SKU13253',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "132354",
                    name: 'SKU13255',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "132378",
                    name: 'SKU13278',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
                {
                    id: "132374",
                    name: 'SKU13274',
                    modeId: '5da6bec9aefa100010c7df67',
                    venueId: '5ebe4c623f617b00163240f6',
                    restrictedVenueIds: ['5ebe4c623f617b00163240f6'],
                    fromPlaceId: "5ebe545532b38a00168c43cb",
                    toPlaceId: "5ebe52dc3f617b00163242ab"
                },
            ]
        };
    }

    componentDidMount() {

    }
    handleBarcodeError = (event: any) => {
        console.log(event);
    }
    handleBarcodeScan = (scannerRecord: any) => {
        if (scannerRecord && scannerRecord !== null) {
            this.setState({
                qrCodeResult: JSON.parse(scannerRecord),
                qrScannVisible: false
            })
            this.props.history.push({
                pathname: '/navigation',
                state: this.state.qrCodeResult
            });
        }
    }
    onListItemClicked = (selectedRowData: any) => {
        this.props.history.push({
            pathname: '/navigation',
            state: selectedRowData
        });
    }
    barCodeScannerClicked = () => {
        this.setState({
            qrScannVisible: true
        });
    }
    handleQrScanPopoverCancel = () => {
        // this.webcamReference.current.stopCamera();
        this.setState({
            qrScannVisible: false
        });
    }
    render() {
        return (<div>
            <QrcodeOutlined className="open-button" onClick={this.barCodeScannerClicked} />
            <div className="list-header-container">
                <h2>SKUs</h2>
                <AutoComplete >
                    <Input.Search size="large" className="list-search" placeholder="Search SKUs" enterButton />
                </AutoComplete>
            </div>
            <div className="list-header-content">
                <ul className="list-group" role="tablist">
                    {this.state.SKUsData.map(item => {
                        return <li key={item.id} className="dashboard-list-group-item list-group-item-action" data-toggle="list" role="tab" onClick={e => this.onListItemClicked(item)}>{item.name}</li>
                    })

                    }
                </ul>
            </div>
            <Modal
                className="qrcode-modal"
                title="QR Scanner"
                visible={this.state.qrScannVisible}
                onCancel={this.handleQrScanPopoverCancel}
                footer={[
                    <Button key="back" onClick={this.handleQrScanPopoverCancel}>
                        Cancel
                    </Button>
                ]}
            >
                {/*  <Webcam
                    width="100%"
                    height="100%"
                    screenshotFormat="image/jpeg"
                    audio={false}
                    ref={this.webcamReference}
                /> */}
                <QrReader
                    delay={300}
                    ref={this.webcamReference}
                    onError={this.handleBarcodeError}
                    onScan={this.handleBarcodeScan}
                    style={{ width: '100%' }}
                />
            </Modal>
        </div >)
    }

}

export default Dashboard;