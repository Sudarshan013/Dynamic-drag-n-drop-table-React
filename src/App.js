import React from "react";
import "./App.css";
import { items } from './test'
import Table from './components/Table'
import { Overlay, Button, Checkbox, H3, Intent, Classes, Icon, Spinner } from "@blueprintjs/core"
import { testData } from './test'
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from 'react-sortable-hoc'
const SortableItem = SortableElement(({ header }) => {
  return <div className="selected-header">
    <Icon icon="drag-handle-vertical" />
    <span style={{ paddingLeft: '10px' }}> {header}</span>
  </div>
})
const SortableList = SortableContainer(({ selectedColumns }) => {
  return (
    <ul>
      {selectedColumns.map((header, index) => (
        <SortableItem key={`item-${header.name}`} index={index} header={header.name} />
      ))}
    </ul>
  );
});
class App extends React.Component {
  state = {
    open: false,
    data: null,
    selectedColumns: []
  }
  componentDidMount = () => {
    this.setState({ data: testData.available_header })
  }
  handleButton = () => {
    this.setState({ open: !this.state.open })
  }
  renderAvailableColumns = () => {
    let { data, selectedColumns } = this.state
    return data.map(({ name, value }) => {
      let index = selectedColumns.findIndex((header) => header.value === value)
      return <Checkbox checked={index > -1} label={name} onChange={() => { this.handleEnabledChange(name, value) }} />
    })
  }
  handleEnabledChange = (name, value) => {
    let selectedColumns = this.state.selectedColumns
    let index = selectedColumns.findIndex((header) => header.value === value)
    index > -1 ? selectedColumns.splice(index, 1) : selectedColumns.push({ name, value })
    console.log(selectedColumns)
    this.setState({ selectedColumns })
  }
  renderSelectedColumns = () => {
    return this.state.selectedColumns.map((header, index) => {
      return <div style={{ padding: "0px 0px 0s" }} >
        header
          </div>
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ selectedColumns }) => ({
      selectedColumns: arrayMove(selectedColumns, oldIndex, newIndex),
    }));
  };
  render() {
    if (!this.state.data) {
      return <Spinner></Spinner>
    }
    return (
      <div className="App">
        <div className="edit-btn">
          <Button intent="primary" onClick={this.handleButton}> Edit column </Button>
        </div>
        <Table headers={this.state.selectedColumns} rows={items} />
        <Overlay
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          onClose={this.handleClose}
          isOpen={this.state.open}
        >
          <div className="overlay" className={Classes.CARD}>
            <H3>Choose your columns</H3>
            <div className="edit-column-container">
              <div className="available-columns">
                <h2>
                  Available Columns
                </h2>
                {this.renderAvailableColumns()}
              </div>
              <div className="selected-columns">
                <h2>
                  Selected Columns
                </h2>
                <SortableList
                  selectedColumns={this.state.selectedColumns}
                  onSortEnd={this.onSortEnd}
                  helperClass='sortableHelper'
                />
              </div>
            </div>
            <div className="overlay-control-btn">
              <Button
                intent={Intent.DANGER}
                onClick={this.handleButton}
                style={{ margin: "" }}
              >
                Close
              </Button>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.handleButton}
                style={{ margin: "1px" }}
              >
                Save
              </Button>
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
}

export default App;
