import React from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={`App-logo${loading ? '-spinning' : ''}`} 
    />
  )
}

const CategoryButton = ({ title, onClick }) => {
  return (
    <button className="Cat-button" href="#" onClick={onClick(title)}>
      <code>{title}</code>
    </button>
  )
}


const CategoriesList = ({ categories, onCategoryClick }) => {
  return categories.map((category, index) => <CategoryButton key={index} title={category} onClick={onCategoryClick} />)
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{value}</code>
      <p>categories: {categories.map((cat, idx) =>
        <span className="Selected-Cat" key={idx}><code>{cat}</code></span>
      )}</p>
    </div>
  )
}

class App extends React.Component {
// function App() {
  // qui tutto ciò che serve al componente per essere inizializzato
  constructor() {
    super()
    this.state = {
      loading: false,
      error: false,
      categories: [],
      selectedCategory: '',
      fetchedJoke: {},
      inputText: '',
      ciaoText: ''
    }
  }

  // getAllCategories
  // funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  getAllCategories = async () => {
    let error = false
    let categories = []
    try {
      this.setState({ loading: true })
      const response = await fetch(ALLCATEGORIESURL)
      const result = await response.json()
      if (!Array.isArray(result)) throw new Error('CATEGORY ERROR')
      categories = [ '', ...result]
    } catch (err) {
      error = true
    } finally {
      this.setState({ ...this.state, loading: false, error, categories })
    }
  }

  // onCategoryClick
  // funzione richiamata al click del componente CategoryButton
  onCategoryClick = (selectedCategory) => (event) => this.setState({
    ...this.state,
    selectedCategory,
    fetchedJoke: {}
  })

  // getRandomJokeByCat
  // funzione che recupera una singola barzelletta e la salva
  getRandomJokeByCat = async () => {
    let error = false
    let fetchedJoke = {}
    try {
      this.setState({ loading: true })
      const response = await fetch(`${RANDOMJOKEBYCATURL}${this.state.selectedCategory}`)
      const result = await response.json()
      if (result && result.status) throw new Error('NO SELECTED CATEGORY')
      fetchedJoke = {...result}
    } catch (err) {
      error = true
      console.error('error?', err.message)
    } finally {
      this.setState({ loading: false, error, fetchedJoke, inputText: '' })
    }
  }

  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  getJokeByKeyword = async () => {
    let error = false
    let fetchedJoke = {}
    try {
      this.setState({ loading: true })
      const response = await fetch(`${ALLLJOKESBYKEYWORD}${this.state.inputText}`)
      const result = await response.json()
      if (result && result.status) throw new Error('INVALID KEYWORD')
      if (result && result.result.length === 0) throw new Error('NO RESULTS')
      fetchedJoke = {...result.result[0]}
    } catch (err) {
      error = true
      console.error('error?', err.message)
    } finally {
      this.setState({ loading: false, error, fetchedJoke, selectedCategory: '' })
    }
  }

  // onInputTextChange
  // handler per l'input di testo
  onInputTextChange = (event) => this.setState({ inputText: event.target.value })

  // qui i lifecycle methods
  componentDidMount() {
    this.getAllCategories()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.error && this.state.error) launchErrorAlert()
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
            loading={this.state.loading}
          />
          <input
            type="search"
            id="search" name="search"
            placeholder="Enter keyword here"
            value={this.state.inputText}
            onChange={this.onInputTextChange}
          />
          <button
            className="Search-Button"
            onClick={this.getJokeByKeyword}
            disabled={this.state.loading}
          >
            <code>CLICK TO SEARCH!</code>
          </button>
          <code>or: </code>
          <CategoriesList
            categories={this.state.categories}
            onCategoryClick={this.onCategoryClick}
          />
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          {this.state.selectedCategory !== '' && (
            <code>
              <h2>SELECTED CATEGORY:
                <span className="Selected-Cat">
                  {this.state.selectedCategory}
                </span>
              </h2>
            </code>
          )}
          <button
            className="Random-Button"
            onClick={this.getRandomJokeByCat}
            disabled={this.state.loading}
          >
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button>
          {Object.keys(this.state.fetchedJoke).length > 0 && <Joke {...this.state.fetchedJoke} />}
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: </code>
        </div>
      </div>
    );
  }
};

export default App;
