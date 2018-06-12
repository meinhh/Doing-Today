import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import moment from 'moment';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
});

class Day extends Component {
	state = {
		checked: []
	}

	toggle = (value, kind) => () => {
		const { checked } = this.state;
		const newChecked = { ...checked };

		if (!newChecked[value]) {
			newChecked[value] = ({
				started: false,
				finished: false
			})
		}

		newChecked[value][kind] = !newChecked[value][kind]

		this.setState({
			checked: newChecked
		});
	};

	isChecked(value, kind) {
		return this.state.checked[value] &&
			this.state.checked[value][kind]
	}
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<List>
					<ListSubheader>{moment(this.props.date).format('YYYY-MM-DD')}</ListSubheader>
					{this.props.todos.map(value => (
						<ListItem key={value} dense button className={classes.listItem}>
							<ListItemText primary={value} />
							<ListItemSecondaryAction>
								<Checkbox
									onChange={this.toggle(value, 'started')}
									checked={this.isChecked(value, 'started')}
								/>
								<Checkbox
									onChange={this.toggle(value, 'finished')}
									checked={this.isChecked(value, 'finished')}
									disabled={!this.isChecked(value, 'started')}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</div>
		);
	}
}

Day.propTypes = {
	classes: PropTypes.object.isRequired,
	todos: PropTypes.arrayOf(PropTypes.string),
	date: PropTypes.objectOf(Date),
}

export default withStyles(styles)(Day);

