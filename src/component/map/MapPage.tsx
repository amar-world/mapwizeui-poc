import React from "react";
import './MapPage.css';
import { RouteComponentProps } from "react-router-dom";
// import MapwizeUI from "mapwize-ui";
import * as MapwizeUI from "mapwize-ui";
// import * as Mapwize from "mapwize";
import { ArrowLeftOutlined } from "@ant-design/icons";


const getUserLocationPath = () => {
    const pathArray = [{ lat: 12.917712669222041, lon: 77.6044683835969 },
    { lat: 12.917712671613884, lon: 77.60446866014846 },
    { lat: 12.91772286724819, lon: 77.6045685433341 },
    { lat: 12.91773121623909, lon: 77.60446849132228 },
    { lat: 12.917730582681742, lon: 77.60445166198764 },
    { lat: 12.917730301286895, lon: 77.60443367352838 },
    { lat: 12.91775019342804, lon: 77.60443374800421 },
    { lat: 12.917758467650302, lon: 77.60443377898275 },
    { lat: 12.91775856536069, lon: 77.60444183449489 },
    { lat: 12.917758908691965, lon: 77.60444183011134 }];
    return pathArray;
}

interface IMapPageState {
    apiKey?: string,
    id?: string,
    name?: string,
    modeId?: string,
    venueId?: string,
    restrictedVenueIds?: string[],
    fromPlaceId?: string,
    toPlaceId?: string,
}
interface IMapPageProps extends RouteComponentProps {

}

class MapPage extends React.Component<IMapPageProps, IMapPageState>{
    constructor(props: IMapPageProps) {
        super(props);
        this.onRouterMatch();
    }
    onRouterMatch = async () => {
        if (this.props.history.location.state && this.props.history.location.state !== undefined) {
            const navState: IMapPageState = this.props.history.location.state;
            this.state = {
                apiKey: '409c586a429534a56046c42977f54425',
                id: navState.id,
                name: navState.name,
                modeId: navState.modeId,
                venueId: navState.venueId,
                restrictedVenueIds: ["5ebe4c623f617b00163240f6"],
                fromPlaceId: navState.fromPlaceId,
                toPlaceId: navState.toPlaceId,
            };
        } else {
            this.state = {
                apiKey: '409c586a429534a56046c42977f54425',
                venueId: '5ebe4c623f617b00163240f6',
                restrictedVenueIds: ['5ebe4c623f617b00163240f6'],

            }
        }
    }
    mapwizeMap: any;
    async componentDidMount() {
        MapwizeUI.apiKey(this.state.apiKey);
        let direction:any = null;
        if(this.state.fromPlaceId && this.state.toPlaceId){
            direction = await MapwizeUI.Api.getDirection({
                from: { placeId: this.state.fromPlaceId },
                to: { placeId: this.state.toPlaceId }
            });
        }
        this.mapwizeMap = await this.createMapwizeInstance(direction);
        this.setUserLocationMovement();
    }
    setUserLocationMovement = () => {
        const pathData = getUserLocationPath();
        for (let i = 0; i < pathData.length; i++) {
            setTimeout(() => {
                this.mapwizeMap.setUserLocation({
                    latitude: pathData[i].lat,
                    longitude: pathData[i].lon,
                    floor: 0,
                });
            }, 3000 * i);

        }
    }


    createMapwizeInstance = async (direction: any) => {
        const mapPromise = new Promise(async (resolve, reject) => {
            const options = {
                apiKey: this.state.apiKey,
                direction: direction,
                minZoom: 21,
                maxZoom: 22,
                centerOnVenueId: this.state.venueId,
                restrictContentToVenueIds: this.state.restrictedVenueIds,
                locale: 'en',
                onMenuButtonClick: () => {

                },
                onSelectedChange: (selectedObject: any, analytics: any) => {
                    console.log('onSelectedChange', selectedObject, analytics);
                }
            }
            MapwizeUI.map(options).then((mapInstance: any) => {
                // mapInstance.on('mapwize:directionstart', (e: any) => { console.log('directionstart', e) });
                resolve(mapInstance);
            }).catch((err: any) => {
                console.error(err);
                reject(err);
            });
        });
        return mapPromise;
    }
    onNavBackButtonClicked = () => {
        this.props.history.goBack();
    }
    render() {
        return (<div>
            <header className="map-header">
                <ArrowLeftOutlined className="nav-Back-button" onClick={this.onNavBackButtonClicked} />
                <div className="header-title"> {this.state.name}</div>
            </header>
            <div id="mapwize"></div>
        </div>)
    }

}

export default MapPage;