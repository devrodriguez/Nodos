Vue.config.devtools = true;
new Vue({
    el: '#app',
    data: {
        dataQuery: {
            tree: null,
            n1: null,
            n2: null
        },
        treePath: [],
        numBranches: 1,
        numNodes: 1,
        ancestor: null
    },
    methods: {
        GetAncestor() {
            if(this.dataQuery.tree == null || this.dataQuery.n1 == null || this.dataQuery.n2 == null){
                toastr.warning('Create tree and select nodes');
                return;
            }

            axios.post('http://localhost:3000/api/nodes/ancestor', this.dataQuery)
            .then(res => {
                this.ancestor = res.data.ancestor;
            })
            .catch(err => {
                throw err;
            });
        },
        CreateTree() {
            // Get data from matrix
            this.treePath = [];

            document.querySelectorAll('#node-container .row').forEach(row => {
                let br = [];

                row.querySelectorAll('input[type=number]').forEach(input => {
                    if(input.value.trim() != "")
                        br.push(input.value);
                });
                
                if(br.length > 0)
                    this.treePath.push(br);
            });

            if(this.treePath.length == 0) {
                toastr.warning('Create nodes');
                return;
            }

            axios.post('http://localhost:3000/api/nodes/create', this.treePath)
            .then(res => {
                this.dataQuery.tree = res.data;
                
                // Get nodes map
                let arrNodes = [].concat.apply([], this.treePath);
                let noDuplici = arrNodes.filter((item, index, array) => array.indexOf (item) == index);
                let nodeMap = noDuplici.map((item, index) => {
                    return { 
                        id: index+1, 
                        label: item
                    }
                });

                var createPath = node_Arr => node_Arr.map((value, i, arr) => { return { value: value, parent: arr[i-1] } });
                var create_paths = arr_paths => arr_paths.map(path => createPath(path));

                let mapTreePath = create_paths(this.treePath);

                let edgeMap = [];
                mapTreePath.forEach(path => {
                    path.forEach(nod => {
                        if(nod.parent) {
                            var edge = {};
                            edge.to = nodeMap.find(item => item.label == nod.value).id;
                            edge.from = nodeMap.find(item => item.label == nod.parent).id;
                            edgeMap.push(edge)
                        }
                    })
                })


                // Get edges map
                /*let edgeMap = [
                    {from: 1, to: 2},
                    {from: 1, to: 3}
                ];*/

                let nodes = new vis.DataSet(nodeMap);

                // create an array with edges
                var edges = new vis.DataSet(edgeMap);

                // Create a network
                var container = document.getElementById('mynetwork');
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var options = {};
                var network = new vis.Network(container, data, options);

                network.on('click', function(params) {
                    console.log(params);
                })
            })
            .catch(err => {
                throw err;
            });
        }
    },
    mounted() {
        
    }

});