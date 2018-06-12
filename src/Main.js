import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Day from './Day'
import moment from 'moment'

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
});

class Main extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Tabs centered value={value} onChange={this.handleChange}>
						<Tab label="Today" />
						<Tab label="Yesterday" />
						<Tab label="Tomorrow" />
					</Tabs>
				</AppBar>
				<TabContainer>
					<Day todos={['replicate', 'refactor', 'eat', value]} date={moment()} />
				</TabContainer>
			</div>
		);
	}
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);