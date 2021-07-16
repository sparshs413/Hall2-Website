import React, { Component } from 'react';
import { Tab, Container, Card, Item, Label, Transition } from 'semantic-ui-react';
import './Extras.css';

class TimeTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			isLoading: true,
			is_mess_admin: true,
			current_day: 0,
			visible: false,
			values: [
				// Breakfast
				{
					sunday: [
						'MASALA DOSA',
						'SAMBHAR',
						'COCONUT CHUTNEY',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
					monday: ['BOMBAY SANDWICH', 'SPROUTED GRAINS', 'MILK(WITH BOURNVITA OR HORLICKS) or', 'TEA /COFFEE or', 'EGG(1)/BANANA(2) or', 'BREAD- BUTTER/JAM or', 'CORNFLAKES'],
					tuesday: [
						'MIXVEG PARATHA',
						'ALOO PARATHA',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
					wednesday: [
						'UTTAPAM',
						'SAMBHAR',
						'COCONUT CHUTNEY',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
					thursday: [
						'POORI SABJ',
						'SOOZI HALWA/ KHASTA KACHORI',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
					friday: [
						'IDLI/ VADA',
						'SAMBHAR',
						'IMLI & GREEN CHUTNEY',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
					saturday: [
						'POHA',
						'JALEBI',
						'DAHI',
						'HALDIRAM BHUJIYA',
						'SPROUTED GRAINS',
						'MILK(WITH BOURNVITA OR HORLICKS) or',
						'TEA /COFFEE or',
						'EGG(1)/BANANA(2) or',
						'BREAD- BUTTER/JAM or',
						'CORNFLAKES',
					],
				},
				// Lunch
				{
					sunday: ['BESAN GATTA SABJI', 'KUNDRU', 'ARHAR DAL', 'MATHA', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					monday: ['RAZMA', 'LEMON RICE', 'ARVI MASALA', 'BOONDI RAITA', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					tuesday: ['KADHI', 'JEERA ALOO', 'GREEN CHUTNE', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					wednesday: ['ARHAR DAL,', 'ALOO SHIMLA/ ALOO PALAK', 'MINT RAITA', 'TAHARI', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					thursday: ['VEG BIRYANI', 'CHANA DAL TADKA', 'KHEERA RAITA', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					friday: ['ALOO BHINDI (ALOO 20%) /BHINDI MASALA/ LUTPUTI BHINDI', 'DAL MAKHANI', 'VEG RAITA', 'CURD/ SEASONAL FRUIT(banana or orange)'],
					saturday: ['CHHOLA', 'PARATHA(MIX VEG, DAL, ALOOO)', 'CHUTNEY', 'ARHAR DAL', 'NIMBU PANI', 'CURD/ SEASONAL FRUIT(banana or orange)'],
				},
				// Dinner
				{
					sunday: ['MASALA DOSA', 'SAMBHAR', 'COCONUT CHUTNEY'],
					monday: ['BOMBAY SANDWICH'],
					tuesday: ['MIXVEG PARATHA', 'ALOO PARATHA'],
					wednesday: ['UTTAPAM', 'SAMBHAR', 'COCONUT CHUTNEY'],
					thursday: ['POORI SABJ', 'SOOZI HALWA/ KHASTA KACHORI'],
					friday: ['IDLI/ VADA', 'SAMBHAR', 'IMLI & GREEN CHUTNEY'],
					saturday: ['PANEER BUTTER MASALA/ KADAI PANEER', 'MASOOR DAL,', 'PULAO RICE', 'NAAN', 'MISSI ROTI', 'LADOO'],
				},
			],
			extras: [
				// Breakfast Extras
				{
					sunday: { EGG: [0, 0] },
					monday: { EGG: [0, 0] },
					tuesday: { EGG: [0, 0] },
					wednesday: { EGG: [0, 0] },
					thursday: { EGG: [0, 0] },
					friday: { EGG: [0, 0] },
					saturday: { EGG: [0, 0] },
				},
				// Lunch Extras
				{
					sunday: { EGG: [0, 0], PANEER: [0, 0], CHILLI_PANEER: [0, 0], CHICKEN_BIRYANI: [0, 0] },
					monday: { EGG: [0, 0], PANEER: [0, 0], PANEER_BHURJI: [0, 0], EGG_BHURJI: [0, 0], DAHI_CHAT: [0, 0] },
					tuesday: { EGG: [0, 0], PANEER: [0, 0], PANEER_TIKKA: [0, 0], STUFFED_SHIMLA_MIRCH: [0, 0] },
					wednesday: { EGG: [0, 0], PANEER: [0, 0], EGG_BIRYANI: [0, 0], SHAHI_PANEER: [0, 0], MILK_CAKE: [0, 0] },
					thursday: { EGG: [0, 0], PANEER: [0, 0], DAHI_VADA: [0, 0] },
					friday: { EGG: [0, 0], PANEER: [0, 0], EGG_CURRY: [0, 0], SPECIAL_LASSI: [0, 0], ALOO_TIKKI: [0, 0] },
					saturday: { EGG: [0, 0], PANEER: [0, 0], CUSTARD_OR_FRUIT_RAITA: [0, 0] },
				},
				// Dinner Extras
				{
					sunday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], CHICKEN_BIRYANI: [0, 0], BUTTER_CHICKEN: [0, 0], MOONG_DAL_HALWA: [0, 0] },
					monday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], ROASTED_CHICKEN: [0, 0] },
					tuesday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], PANEERDO_PYAZA: [0, 0] },
					wednesday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0] },
					thursday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], HARIYALI_KABAB: [0, 0] },
					friday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], CHILLY_CHICKEN: [0, 0] },
					saturday: { EGG: [0, 0], PANEER: [0, 0], CHICKEN: [0, 0], SHAHI_TOAST: [0, 0] },
				},
			],
		};
		this.change = this.change.bind(this);
	}

	componentDidMount() {
		var d = new Date();
		this.setState({ visible: true, current_day: d.getDay() });
	}

	change() {
		this.setState({ visible: false });
		setTimeout(() => {
			this.setState({ visible: true });
		}, 300);
	}

	group(day) {
		var values = { ...this.state.values };
		var extras = { ...this.state.extras };
		return (
			<Container className='extras card_set'>
				<Transition animation='slide left' duration={300} visible={this.state.visible}>
					<Card.Group>
						{[...Array(3)].map((e, i) => {
							return (
								<Card>
									<Card.Content>
										<Card.Header>{i === 0 ? 'Breakfast' : i === 1 ? 'Lunch' : 'Dinner'}</Card.Header>
										<Card.Description>
											<Item.Group divided>
												<Item>
													<Item.Content>
														{values[i][day].map((item) => {
															return (
																<>
																	<Item.Header style={{ margin: '2px 0' }}>{item}</Item.Header>
																	<br />
																</>
															);
														})}
													</Item.Content>
												</Item>

												<Item style={{ padding: '12px 0' }}>
													<Item.Content>
														<h4 style={{ margin: '-10px 0 5px' }}>Extras</h4>
														{Object.keys(extras[i][day]).map((key, value) => {
															return (
																<>
																	<Item.Header style={{ marginTop: '5px' }}>{key}</Item.Header>
																	<Label style={{ position: 'absolute', right: '0' }}>
																		{/* <Label style={{ float: "right" }}> */}
																		{/* ₹ {extras[i][day][key][0]} */}₹
																	</Label>
																	{/* <Label>{extras[i][day][key][1]} left</Label> */}
																	<br />
																</>
															);
														})}
													</Item.Content>
												</Item>
											</Item.Group>
										</Card.Description>
									</Card.Content>
								</Card>
							);
						})}
					</Card.Group>
				</Transition>
			</Container>
		);
	}

	render() {
		const panes = [
			{
				menuItem: 'Sunday',
				render: () => (
					<Tab.Pane>
						Sunday
						{this.group('sunday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Monday',
				render: () => (
					<Tab.Pane>
						Monday
						{this.group('monday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Tuesday',
				render: () => (
					<Tab.Pane>
						Tuesday
						{this.group('tuesday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Wednesday',
				render: () => (
					<Tab.Pane>
						Wednesday
						{this.group('wednesday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Thursday',
				render: () => (
					<Tab.Pane>
						Thursday
						{this.group('thursday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Friday',
				render: () => (
					<Tab.Pane>
						Friday
						{this.group('friday')}
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Saturday',
				render: () => (
					<Tab.Pane>
						Saturday
						{this.group('saturday')}
					</Tab.Pane>
				),
			},
		];

		return (
			<Container className='extras'>
				<h3>
					Menu of the WEEK
					{/* {this.state.is_mess_admin && (
            <Button primary floated="right" href="/form-time-table">
              Edit Menu
              <Icon name="right chevron" />
            </Button>
          )} */}
				</h3>
				<Tab panes={panes} defaultActiveIndex={this.state.current_day} onTabChange={this.change} />
			</Container>
		);
	}
}

export default TimeTable;
