import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { Loading, Owner, IssuesList, Filter, Pagination } from './styles';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    filter: 'all',
    pagination: '5',
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      loading: false,
      issues: issues.data,
      repository: repository.data,
    });
  }

  handleFilter = async e => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    if (e.target.name === 'pagination') {
      var value = e.target.value;
      this.setState(
        {
          pagination: value,
        },
        async () => {
          const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
              state: this.state.filter,
              per_page: this.state.pagination,
              page: this.state.page,
            },
          });
          this.setState({
            issues: response.data,
          });
        }
      );
    }
    if (e.target.name === 'filter') {
      var id = e.target.id;
      this.setState(
        {
          filter: id,
        },
        async () => {
          const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
              state: this.state.filter,
              per_page: this.state.pagination,
              page: this.state.page,
            },
          });
          this.setState({
            issues: response.data,
          });
        }
      );
    }
    if (e.target.name === 'nextPage') {
      var id = e.target.id;
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
              state: this.state.filter,
              per_page: this.state.pagination,
              page: this.state.page,
            },
          });
          this.setState({
            issues: response.data,
          });
        }
      );
    }
    if (e.target.name === 'prevPage') {
      var id = e.target.id;
      this.setState(
        {
          page: this.state.page - 1,
        },
        async () => {
          const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
              state: this.state.filter,
              per_page: this.state.pagination,
              page: this.state.page,
            },
          });
          this.setState({
            issues: response.data,
          });
        }
      );
    }
    console.log(this.state);
  };

  render() {
    const { loading, repository, issues } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/"> Voltar aos repositórios </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Filter>
          <div>
            <span>All</span>
            <input
              type="radio"
              name="filter"
              id="all"
              onClick={this.handleFilter}
            />
          </div>
          <div>
            <span>Open</span>
            <input
              type="radio"
              name="filter"
              id="open"
              onClick={this.handleFilter}
            />
          </div>
          <div>
            <span>Closed</span>
            <input
              type="radio"
              name="filter"
              id="closed"
              onClick={this.handleFilter}
            />
          </div>
          <div>
            <select
              name="pagination"
              id="pagination"
              onChange={this.handleFilter}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </Filter>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <Pagination>
          <div>
            <span>{this.state.page}</span>
          </div>
          <div>
            <button
              onClick={this.handleFilter}
              disabled={this.state.page === 1 ? true : false}
              name="prevPage"
            >
              Anterior
            </button>
            <button name="nextPage" onClick={this.handleFilter}>
              Proxima
            </button>
          </div>
        </Pagination>
      </Container>
    );
  }
}
