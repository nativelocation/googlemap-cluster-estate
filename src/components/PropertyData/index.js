import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import favor from '../../assets/img/hard.png';
import bfavor from '../../assets/img/bluehard.png';

import './style.css';

class PropertyData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fav: JSON.parse(localStorage.getItem('fav')),
		}
	}

	favClick = (property) => {
		const { fav } = this.state;
		if (_.findIndex(fav, item => item === property.id) > -1) {
			localStorage.setItem('fav', JSON.stringify(_.filter(JSON.parse(localStorage.getItem('fav')), item => item !== property.id)));
		} else {
			if (localStorage.getItem('fav') === null) {
				localStorage.setItem('fav', JSON.stringify([property.id]));
			} else {
				localStorage.setItem('fav', JSON.stringify(JSON.parse(localStorage.getItem('fav')).concat([property.id])));
			}
		}
		this.setState({
			fav: JSON.parse(localStorage.getItem('fav')),
		})
	}

	render() {
		const { fav } = this.state;
		const { property } = this.props;

		return (
			<div className="properties-data-container">
						<div className="address word-break">
							{property.address1}
							<div className="properties-fav" onClick={() => this.favClick(property)}>
								<img src={(fav.length > 0 && _.findIndex(fav, item => item === property.id) > -1) ? bfavor : favor} alt="" />
							</div>
						</div>
						<div className="address word-break">{property.address2}</div>
						<div className="bed-bath-size word-break">
							{`${property.beds} beds ${property.baths} baths ${property.buildingSize}m`}
						</div>
						<div className="description word-break">
							{property.description}
						</div>
						<div className="mid-border"></div>
						<div className="mid-title">Facts & Features</div>
						<div className="mid-container">
							<div className="mid-container-item">
								<div className="mid-container-item-title">Type</div>
								<div className="mid-container-item-content">{property.type}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Certificate</div>
								<div className="mid-container-item-content">{property.certificate}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Building Size</div>
								<div className="mid-container-item-content">{property.buildingSize}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Land Size</div>
								<div className="mid-container-item-content">{property.landSize}</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Parking</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'parking') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'parking')].meta_value
										: 'n/a'
									}
								</div>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Year Built</div>
								<div className="mid-container-item-content">
									{
										_.findIndex(property.Details, item => item.meta_key === 'yearBuilt') > -1
										? property.Details[_.findIndex(property.Details, item => item.meta_key === 'yearBuilt')].meta_value
										: 'n/a'
									}
								</div>
							</div>
						</div>
						<div className="mid-border"></div>
						<div className="mid-title">Interior Features</div>
						<div className="mid-container interior">
							<div className="mid-container-item">
								<div className="mid-container-item-title">Bedrooms / Bathrooms</div>
								<ul>
									<li className="mid-container-item-content">{`Beds: ${property.beds}`}</li>
									<li className="mid-container-item-content">{`Baths: ${property.baths}`}</li>
									<li className="mid-container-item-content">{`Master: ${property.masters ? property.masters : 'n/a'}`}</li>
								</ul>
							</div>
							<div className="mid-container-item">
								<div className="mid-container-item-title">Other</div>
								<ul>
									<li className="mid-container-item-content">
										{`Electricity: ${
											_.findIndex(property.Details, item => item.meta_key === 'electricity') > -1
											? property.Details[_.findIndex(property.Details, item => item.meta_key === 'electricity')].meta_value
											: 'n/a'
										}`}
									</li>
									<li className="mid-container-item-content">
										{`Floors: ${
											_.findIndex(property.Details, item => item.meta_key === 'floors') > -1
											? property.Details[_.findIndex(property.Details, item => item.meta_key === 'floors')].meta_value
											: 'n/a'
										}`}
									</li>
								</ul>
							</div>
						</div>
					</div>
		)
	}
}

PropertyData.propTypes = {
	property: PropTypes.object.isRequired,
};

export default PropertyData;
