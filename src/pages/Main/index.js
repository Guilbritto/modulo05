import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List, InputChange } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';
import { Exception } from 'handlebars';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    notFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.repositories !== this.state.repositories) {
      localStorage.setItem(
        'repositories',
        JSON.stringify(this.state.repositories)
      );
    }
  }
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      this.setState({ loading: true });
      const { newRepo, repositories } = this.state;
      const repo = this.state.repositories.find(element => {
        if (
          element.name.toLowerCase() === this.state.newRepo.toLocaleLowerCase()
        ) {
          console.log(this.state.newRepo);
          throw new Error('Repositório duplicado');
        }
      });

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        notFound: false,
      });
    } catch (err) {
      console.error(`asdasdad: ${err}`);
      this.setState({ notFound: true, loading: false });
    }
  };

  render() {
    const { repositories, newRepo, loading, notFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repository
        </h1>

        <Form onSubmit={this.handleSubmit} notFound={notFound}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span> {repository.name} </span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                {' '}
                Detalhes{' '}
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
