import Test from './test/test'

function App() {
  return (
    <main>
      <div className='mainContainer'>
        <section className='section historikData'>
          <h1>Исторические даты</h1>
        </section>

        <section className='data'>
          <div>2017</div>
          <div>2020</div>
          <Test/>
        </section>

        <section className="section scroll">
          <div>
            <div>0/6</div>
            <div>
              <button>left</button>
              <button>rigth</button>
            </div>
          </div>

          <div>
            {/* map */}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
