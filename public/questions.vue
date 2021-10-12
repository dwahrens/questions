<!-- better way of handling things -->
<template>
<div>
  <article class="hero is-dark is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-2 has-text-centered">Questions App</h1>
        <hr>
        <div v-if="loading" class="is-loading">
          <p class="is-bold">Loading Information...</p>
        </div>
        <div v-if="error" class="is-error">
          {{ error }}
        </div>
        <div v-if="!loading">
          <ul id="questions" class="is-full">
            <li v-for="(question, question_index) in questions" :key="question_index">
              <div class="columns">
                <div class="column is-three-quarters">
                  <p class="is-size-1 is-underligned">{{ question.question_display_text }}</p>
                </div>
                <div class="column is-one-quarter align-left">
                  <button class="button is-link" v-on:click="showQuestion = !showQuestion"><span v-if="!showQuestion">View</span><span v-else>Hide</span></button>
                  <button class="button is-primary" :data-id="question_index" v-on:click="editQuestion">Edit</button>
                </div>
              </div>
              <div v-show="showQuestion">
                <p class="pb-2"><i>Question: </i><b>{{ question.question_text }}</b></p>
                <div class="columns is-half pb-2">
                  <div class="column is-one-quarter">
                    <p><i>Answer Values: </i></p>
                  </div>
                  <div class="column is-one-quarter align-left">
                    <ul>
                      <li v-for="(answer, answer_index) in question.answer_values" :key="answer_index">
                        {{ answer }}
                      </li>
                    </ul>
                  </div>
                </div>
                <p><i>Required: </i><b v-if="question.required">Yes</b><b v-if="!question.required">No</b></p>
                <p><i>Type: </i><b>{{ question.type }}</b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
  <!-- add the modal here -->
  <div class="modal" :class="{'is-active': showEdit}" v-show="showEdit">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Question</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <!-- bind question information to a form to edit -->
        <form action="/questions" type="post">
          <fieldset>
            <div class="field is-horizontal">
              <div class="field-label">
                <label for="eventTitle" class="label is-normal">Question: </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <textarea id="question" name="question" v-model="question.question_text"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label for="eventTitle" class="label is-normal">Required: </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="radio">
                      <input type="radio" id="required" name="required" value="true" v-model="question.required"/> 
                      Yes
                    </div>
                  </div>
                  <div class="radio">
                    <input type="radio" id="required" name="required" value="false" v-model="question.required"/> 
                    No
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label for="eventTitle" class="label is-normal">Type: </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="select">
                      <select v-model="question.type">
                        <!-- This should be another for loop with all of the options defined in an array -->
                        <option value="Checkbox">Checkbox</option>
                        <option value="Text">Text</option>
                        <option value="Boolean">True/False</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
      <footer class="modal-card-foot align-right">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</div>
</template>  
<script>
  let self = null
  let vue = new Vue({
    el: '#app',
    data: {
      // This could technically be an array of objects
      questions: [],
      question: {
        answer_values: null, // Defaulting to null, assuming that there could be different answer values based on the type. See below
        question_text: '', // Longhand display of the question
        question_display_text: '', // Shorthand display of the question
        required: false, // Defaulting to false
        type: '' // Assuming different types can exists such as String, True/False, Checkbox
      },
      showQuestion: false,
      showEdit: false,
      loading: true,
      error: false,
    },
    methods: {
      fetchData: () => {
        const myRequest = new Request('/questions/')
        fetch(myRequest)
          .then((response) => { return response.json() })
          .then((data) => {
            console.log(data)
            self.questions.push(data.question)
            self.question = data.question
            self.loading = false
            // parse all of the questions into an array
            // display the questions
          }).catch(error => { this.error = error })
      },
      editQuestion: (event) => {
        let id = Number(event.target.dataset.id)
        this.question = questions[id]
        this.showEdit = true
      }
    },
    mounted() {
      self = this
      console.log('Getting Data')
      this.fetchData()
    }
  })
</script>
<css>
</css>
