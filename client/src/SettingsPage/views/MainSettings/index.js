import React from 'react';
import axios from 'axios';
import { Grid, Box, Text } from 'evokit';

import Section from '../Section';
import InputField from '../../../UI/InputFileld';
import Button from '../../../UI/Button';

import settingsIcon from './settings.svg';

class MainSettings extends React.Component {
    state = {
        likeReaction: null,
        reactionCount: null,
        isChanged: false,
        loading: true,
        errors: null,
    }

    componentDidMount() {
        axios.get('api/settings')
            .then(({ data }) => this.setState({
                ...data,
                loading: false,
            }));
    }

    onSettingsChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
            isChanged: true,
        });
    }

    validateData = () => {
        const { likeReaction, reactionCount } = this.state;
        const errors = {};

        if (!likeReaction.length) {
            errors.likeReaction = 'Обязательное поле!';
        }
        if (reactionCount <= 0) {
            errors.reactionCount ='Обязательное поле!';
        }

        if (Object.keys(errors).length) throw new Error(JSON.stringify(errors));

        this.setState({
            errors: null,
        });
    }

    onSaveSettings = () => {
        const { likeReaction, reactionCount } = this.state;
        const data = { likeReaction, reactionCount };

        try {
            this.validateData();

            axios.put('api/settings', data)
            .then(({ data }) => this.setState({
                ...data,
                isChanged: false,
            }));
        }
        catch (error) {
            this.setState({
                errors: JSON.parse(error.message)
            });
        }
    }

    render() {
        const { likeReaction, reactionCount, isChanged, loading, errors } = this.state;

        return (
            <Section
                loading={loading}
                icon={settingsIcon}
                title='Общие'
            >
                <Grid grid-indent='s' grid-wrap='nowrap' grid-valign='bottom'>
                    <Grid.Item>
                        <InputField
                            label='Лайк реакция'
                            type='text'
                            value={likeReaction}
                            name='likeReaction'
                            onChange={this.onSettingsChange}
                            errors={errors && errors.likeReaction}
                        />
                    </Grid.Item>
                    <Grid.Item>
                        <InputField
                            label='Количество'
                            type='number'
                            value={reactionCount}
                            name='reactionCount'
                            onChange={this.onSettingsChange}
                            errors={errors && errors.reactionCount}
                        />
                    </Grid.Item>
                    {
                        isChanged && (
                            <Grid.Item>
                                <Button onClick={this.onSaveSettings} theme='green'>
                                    Сохранить
                                </Button>
                            </Grid.Item>    
                        )
                    }
                </Grid>
            </Section>
        )
    }
};

export default MainSettings;